export const { NODE_ENV: nodeEnv } = process.env;

const env = process.env;

export const staticUrl = env.NEXT_PUBLIC_STATIC_URL;

export const rewardsApiUrl = env.NEXT_PUBLIC_REWARDS_API_URL;
