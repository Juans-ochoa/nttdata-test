import { ClanInterface } from "../types";

interface Props {
  clan: ClanInterface;
}

export const Clan = ({ clan }: Props) => {
  return (
    <article className='card__clan cols-12 col-sm-6 col-md-4 m-1'>
      <div>
        <img
          src={clan.badgeUrls.medium}
          alt='Clash of Clans'
          className='card__clan_img'
        />
      </div>
      <section className='card__clan_body'>
        {clan.labels.length > 0 && (
          <img
            src={clan.labels[0].iconUrls.small}
            alt={clan.labels[0].name}
            className='card__level_img'
          />
        )}
        <div className='clan__info'>
          <h4>{clan.name}</h4>
          <p>
            Level:{" "}
            <span className='badge rounded-pill bg-secondary'>
              {clan.clanLevel}
            </span>
          </p>
          <p>
            Members: <span>{clan.members}</span>
          </p>
          <p>
            Requiered Trophies: <span>{clan.requiredTrophies}</span>
          </p>
        </div>
        <div className='clan__stadistics d-flex justify-space-betweend flex-wrap'>
          <p className='mx-1'>
            Points:{" "}
            <span className='badge rounded-pill bg-primary'>
              {clan.clanPoints}
            </span>
          </p>
          <p className='mx-1'>
            Wars win:{" "}
            <span className='badge rounded-pill bg-success'>
              {clan.warWins}
            </span>
          </p>
          <p className='mx-1'>
            Wars lose:{" "}
            <span className='badge rounded-pill bg-danger'>
              {clan.warLosses || ""}
            </span>
          </p>
        </div>
      </section>
    </article>
  );
};
