import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="bg-white shadow-lg mb-4 container mx-auto max-w-screen-2xl rounded-md px-6">
      <h2 className="font-bold md:text-xl lg:text-2xl">Nearby Locations :</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((item) => {
          return (
            <div key={item.id} className="mb-4 flex flex-col p-4 border-b border-blue-700 md:border-none">
              <img
                src={item.picture_url.url}
                alt={item.name}
                className="rounded-md w-full h-60 mb-4 object-cover shadow-lg shadow-slate-950"
              />
              {/* location desc */}
              <div className="m-4 text-sm">
                <p className="font-bold">{item.smart_location}</p>
                <p className="text-slate-400">{item.name}</p>
                <p className="font-bold">
                  €&nbsp;{item.price}&nbsp;
                  <span className="text-slate-400">Night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
