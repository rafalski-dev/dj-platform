export function HighlightedSongDetails({ songDetails }) {
  return (
    <div>
      <div>
        <span>{songDetails.artist}</span>
        <span>{songDetails.title}</span>
      </div>
    </div>
  );
}
