import { staticUrl } from '@/core/client-settings';
import { Rank } from '@/ranking/models/enums/rank.enum';
import Image from 'next/image';

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  rank: Rank;
  width?: number;
  height?: number;
}

export function IconRank({ rank, width = 40, height = 40 }: Props) {
  return (
    <Image
      src={`${staticUrl}/icons/rank/${rank}.webp`}
      loading="lazy"
      height={height}
      width={width}
      alt={`Icon rank ${rank}`}
    />
  );
}
