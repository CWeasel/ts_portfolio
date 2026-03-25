import type { ModelSchema } from "@/types/admin-types";
import ProfileSection from "./admin-profile-section";

interface Profile {
    full_name?: string;
    headline?: string;
    summary?: string;
    location?: string;
    email?: string;
    github_url?: string;
    linkedin_url?: string;
    photo_url?: string;
};

const ProfileSchema: ModelSchema<Profile> = {
    name: "Profile",
    endpoint: "/admin/profile",
    fields: [
        { key: "full_name", label: "Full Name", type: "text", required: true },
        { key: "headline", label: "Headline", type: "text", required: true },
        { key: "summary", label: "Summary", type: "text", required: false },
        { key: "location", label: "Location", type: "text", required: false },
        { key: "email", label: "Email", type: "text", required: false },
        { key: "github_url", label: "GitHub URL", type: "text", required: false },
        { key: "linkedin_url", label: "LinkedIn URL", type: "text", required: false },
        { key: "photo_url", label: "Photo URL", type: "text", required: false },
    ]
}

export const AdminProfileSection = () => <ProfileSection schema={ProfileSchema} />