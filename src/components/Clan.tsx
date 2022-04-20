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
        <h4>{clan.name}</h4>
        <div className='clan__info d-flex justify-space-betweend flex-wrap'>
          <p className='m-1'>
            <strong>Level:</strong>
            <span className='badge bg-secondary mx-1'>{clan.clanLevel}</span>
          </p>
          <p className='m-1'>
            <strong>Members:</strong>{" "}
            <span className='badge bg-dark text-white mx-1'>
              {clan.members}
            </span>
          </p>
          <p className='m-1'>
            <strong>Requiered Trophies:</strong>{" "}
            <span className='badge bg-primary mx-1'>
              {clan.requiredTrophies}
            </span>
          </p>
        </div>
        <div className='clan__stadistics d-flex justify-space-betweend flex-wrap'>
          <p className='m-1'>
            <strong>Points:</strong>
            <span className='badge rounded-pill bg-primary mx-1'>
              {clan.clanPoints}
            </span>
          </p>
          <p className='m-1'>
            <strong>Wars win:</strong>
            <span className='badge rounded-pill bg-success mx-1'>
              {clan.warWins}
            </span>
          </p>
          <p className='m-1'>
            <strong>Wars lose:</strong>
            <span className='badge rounded-pill bg-danger mx-1'>
              {clan.warLosses || ""}
            </span>
          </p>
        </div>
      </section>
    </article>
  );
};
