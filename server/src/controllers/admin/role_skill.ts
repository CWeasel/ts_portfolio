import type { FastifyInstance } from "fastify";
import { getSkills } from "./skills";
import { getRoles } from "./roles";

const getSkillsForRole = async (app: FastifyInstance, role_id: string) => {
  // Check if role exists
  const existingRoles = await getRoles(app, role_id);
  if (existingRoles.length === 0) {
    throw new Error("Role not found.");
  }

  const { rows } = await app.pg.query(
    `
        SELECT role_id, skill_id
        FROM role_skills
        WHERE role_id = $1
      `,
    [role_id],
  );
  return rows;
};

const addSkillToRole = async (
  app: FastifyInstance,
  role_id: string,
  skill_id: string,
) => {
  // Check if role exists
  const existingRoles = await getRoles(app, role_id);
  if (existingRoles.length === 0) {
    throw new Error("Role not found.");
  }
 
  // Check if skill exists
  const existingSkills = await getSkills(app, skill_id);
  if (existingSkills.length === 0) {
    throw new Error("Skill not found.");
  }

  const { rows } = await app.pg.query(
    `
        INSERT INTO role_skills (role_id, skill_id)
        VALUES ($1, $2)
        RETURNING role_id, skill_id
        `,
    [role_id.trim(), skill_id.trim()],
  );

  return rows[0];
};

const removeSkillFromRole = async (
  app: FastifyInstance,
  role_id: string,
  skill_id: string,
) => {
  // Check if role exists
  const existingRoles = await getRoles(app, role_id);
  if (existingRoles.length === 0) {
    throw new Error("Role not found.");
  }

  // Check if skill exists
  const existingSkills = await getSkills(app, skill_id);
  if (existingSkills.length === 0) {
    throw new Error("Skill not found.");
  }

  const { rows } = await app.pg.query(
    `
        DELETE FROM role_skills
        WHERE role_id = $1 AND skill_id = $2
        RETURNING role_id, skill_id
      `,
    [role_id.trim(), skill_id.trim()],
  );
  return rows[0];
};

export const updateSkillForRole = async (
  app: FastifyInstance,
  role_id: string,
  skill_ids: [string]
) => {
    // Get existing role skills
    const existingSkills = await getSkillsForRole(app, role_id);
    const existingSkillIds = existingSkills.map((skill) => skill.skill_id);

    // Remove skills not in the new list
    for (const skill_id of existingSkillIds) {
      if (!skill_ids.includes(skill_id)) {
        await removeSkillFromRole(app, role_id, skill_id);
      }
    }

    // Add new skills
    for (const skill_id of skill_ids) {
      if (!existingSkillIds.includes(skill_id)) {
        await addSkillToRole(app, role_id, skill_id);
      }
    }
};