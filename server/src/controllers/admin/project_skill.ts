import type { FastifyInstance } from "fastify";
import { getSkills } from "./skills";
import { getProjects } from "./projects";

const getSkillsForProject = async (app: FastifyInstance, project_id: string) => {
  // Check if project exists
  const existingProjects = await getProjects(app, project_id);
  if (existingProjects.length === 0) {
    throw new Error("Project not found.");
  };

    const { rows } = await app.pg.query(
        `
        SELECT project_id, skill_id
        FROM project_skills
        WHERE project_id = $1
      `,
      [project_id],
    );
    return rows;
};

const addSkillToProject = async (
  app: FastifyInstance,
  project_id: string,
  skill_id: string,
) => {
  // Check if project exists
  const existingProjects = await getProjects(app, project_id);
  if (existingProjects.length === 0) {
    throw new Error("Project not found.");
  }
 
  // Check if skill exists
    const existingSkills = await getSkills(app, skill_id);
    if (existingSkills.length === 0) {
      throw new Error("Skill not found.");
    }

  const { rows } = await app.pg.query(
    `
        INSERT INTO project_skills (project_id, skill_id)
        VALUES ($1, $2)
        RETURNING project_id, skill_id
        `,
    [project_id.trim(), skill_id.trim()],
  );

  return rows[0];
};

const removeSkillFromProject = async (
  app: FastifyInstance,
  project_id: string,
  skill_id: string,
) => {
  // Check if project exists
  const existingProjects = await getProjects(app, project_id);
  if (existingProjects.length === 0) {
    throw new Error("Project not found.");
  }
 
  // Check if skill exists
    const existingSkills = await getSkills(app, skill_id);
    if (existingSkills.length === 0) {
      throw new Error("Skill not found.");
    }

  const { rows } = await app.pg.query(
    `
        DELETE FROM project_skills
        WHERE project_id = $1 AND skill_id = $2
        RETURNING project_id, skill_id
        `,
    [project_id.trim(), skill_id.trim()],
  );

  return rows[0];
};

export const updateSkillForProject = async (
  app: FastifyInstance,
  project_id: string,
  skill_ids: string[],
) => {
  // Check if project exists
  const existingProjects = await getProjects(app, project_id);
  if (existingProjects.length === 0) {
    throw new Error("Project not found.");
  }

  // Get current skills for the project
  const currentSkills = await getSkillsForProject(app, project_id);
  const currentSkillIds = currentSkills.map((ps) => ps.skill_id);

  // Determine which skills to add and which to remove
  const skillsToAdd = skill_ids.filter((id) => !currentSkillIds.includes(id));
  const skillsToRemove = currentSkillIds.filter((id) => !skill_ids.includes(id));

  // Add new skills
  for (const skill_id of skillsToAdd) {
    await addSkillToProject(app, project_id, skill_id);
  }

  // Remove old skills
  for (const skill_id of skillsToRemove) {
    await removeSkillFromProject(app, project_id, skill_id);
  }

  // Return updated list of skills for the project
  const updatedSkills = await getSkillsForProject(app, project_id);
  return updatedSkills;
};