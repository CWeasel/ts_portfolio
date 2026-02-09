interface HeroData {
  full_name: string;
  headline: string;
  summary?: string;
  location?: string;
  photo_url?: string | null;
}

export function HeroBlock({ data }: { data: HeroData } ) {
  return (
    <section>
      {data.photo_url && (
        <img
          src={data.photo_url}
          alt={data.full_name}
          style={{ width: 120, borderRadius: "50%" }}
        />
      )}
      <h1>{data.full_name}</h1>
      <h3>{data.headline}</h3>
      {data.location && <p>{data.location}</p>}
      {data.summary && <p>{data.summary}</p>}
    </section>
  );
}
