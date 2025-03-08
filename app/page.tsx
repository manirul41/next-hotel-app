
import PropertyCard from "@/components/PropertyCard";

export default async function Home() {
  const response = await fetch("https://next-hotel-app.netlify.app/api/landing");
  const data = await response.json();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {/* Hotel Property Cards */}
          {data?.hotels?.map((hotel: any) => (
            <PropertyCard key={hotel.id} {...hotel} session={''} />
          ))}
        </div>
      </main>
    </div>
  );
}
