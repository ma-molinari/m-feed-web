interface Props {
  label: string;
  value: number;
}

const StatsCard = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};

export default StatsCard;
