import { BorderImage } from '@/borders/components/border-player';
import { BorderProplayer } from '@/borders/components/proplayer-cover';
import { SummonerSpell } from '@/borders/models/enums/summoner-spell.enum';
import { montserrat } from '@/consts/fonts';
import { Rank } from '@/ranking/models/enums/rank.enum';
import Image from 'next/image';
import { IconSummonerSpell } from '../icon-spell';
import styles from './border-rank.module.css';

interface Props {
  rank: Rank;
  url: string;
  username: string;
  avatarUrl: string;
  name: string;
}

interface BorderProps {
  url: string;
  username: string;
  avatarUrl: string;
  name: string;
}

const BorderChallenger = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-challenger']}`}
      >
        <BorderProplayer url={url} width={280} height={445} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-challenger']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Challenger} />
      </div>
      <p className={`${styles.username} ${styles['username-challenger']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-challenger']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-challenger']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

const BorderMaster = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-master']}`}
      >
        <BorderProplayer url={url} width={310} height={460} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-master']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Master} />
      </div>
      <p className={`${styles.username} ${styles['username-master']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-master']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-master']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

const BorderDiamond = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-diamond']}`}
      >
        <BorderProplayer url={url} width={310} height={460} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-diamond']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Diamond} />
      </div>
      <p className={`${styles.username} ${styles['username-diamond']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-diamond']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-diamond']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

const BorderPlatinium = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-platinium']}`}
      >
        <BorderProplayer url={url} width={310} height={450} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-platinium']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Platinium} />
      </div>
      <p className={`${styles.username} ${styles['username-platinium']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-platinium']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-platinium']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

const BorderGold = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-gold']}`}
      >
        <BorderProplayer url={url} width={298} height={465} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-gold']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Gold} />
      </div>
      <p className={`${styles.username} ${styles['username-gold']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-gold']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-gold']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

const BorderSilver = ({ url, name, username, avatarUrl }: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-silver']}`}
      >
        <BorderProplayer url={url} width={298} height={465} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-silver']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Silver} />
      </div>
      <p className={`${styles.username} ${styles['username-silver']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-silver']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={47.7}
          width={47}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={47.2}
          width={46}
        />
      </div>
      <Image
        className={`${styles.avatar} ${styles['avatar-silver']}`}
        src={avatarUrl}
        loading="eager"
        width={70}
        height={70}
        alt={`Avatar ${username}`}
      />
    </div>
  );
};

export const BorderBroze = ({
  url,
  name,
  username,
  avatarUrl,
}: BorderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles['proplayer-container']} ${styles['proplayer-bronze']}`}
      >
        <BorderProplayer url={url} width={300} height={465} />
      </div>
      <div
        className={`${styles['card-name-container']} ${styles['card-name-bronze']}`}
      >
        <h3 className={`${montserrat.className} ${styles['card-name']}`}>
          {name}
        </h3>
      </div>
      <div className={styles['border-container']}>
        <BorderImage rank={Rank.Bronze} />
      </div>
      <p className={`${styles.username} ${styles['username-bronze']}`}>
        {username}
      </p>
      <div
        className={`${styles['summoners-container']} ${styles['summoners-bronze']}`}
      >
        <IconSummonerSpell
          spell={SummonerSpell.Flash}
          height={49.4}
          width={47.4}
        />
        <IconSummonerSpell
          spell={SummonerSpell.Ignite}
          height={49.6}
          width={49}
        />
      </div>
      <div
        className={`${styles.avatar} ${styles['avatar-bronze']}`}
        style={{
          backgroundImage: `url(${avatarUrl})`,
        }}
      ></div>
    </div>
  );
};

export function BorderRank({ rank, url, username, avatarUrl, name }: Props) {
  if (rank === Rank.Challenger)
    return (
      <BorderChallenger
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );

  if (rank === Rank.Master)
    return (
      <BorderMaster
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );

  if (rank === Rank.Diamond)
    return (
      <BorderDiamond
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );

  if (rank === Rank.Platinium)
    return (
      <BorderPlatinium
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );

  if (rank === Rank.Gold)
    return (
      <BorderGold
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );
  if (rank === Rank.Silver)
    return (
      <BorderSilver
        url={url}
        username={username}
        avatarUrl={avatarUrl}
        name={name}
      />
    );

  return (
    <BorderBroze
      url={url}
      username={username}
      avatarUrl={avatarUrl}
      name={name}
    />
  );
}
