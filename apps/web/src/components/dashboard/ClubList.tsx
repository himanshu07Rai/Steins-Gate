import Card from "./Card";

const ClubList = ({
  clubs,
}: {
  clubs: Array<{
    id: string;
    title: string;
    passcode: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {clubs.length > 0 ? (
        clubs.map((club) => <Card key={club.id} club={club} />)
      ) : (
        <div className="text-center text-2xl w-screen">No clubs found</div>
      )}
    </div>
  );
};

export default ClubList;
