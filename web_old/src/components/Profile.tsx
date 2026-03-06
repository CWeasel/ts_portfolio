type ProfileProps = {
  profile: {
    name: string;
    title: string;
    summary: string;
  };
};

export function Profile({ profile }: ProfileProps) {
  return (
    <section>
      <h1>{profile.name}</h1>
      <h3>{profile.title}</h3>
      <p>{profile.summary}</p>
    </section>
  );
}
