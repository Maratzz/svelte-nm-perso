export const load = async ({parent, data}) => {
  await parent()
  let { games } = data

  return {
    games
  }
}