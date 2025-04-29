import Stories from "@/components/Stories";

export default async function StoriesPage() {
  return (
    <div className="min-h-[calc(100vh-64px-64px)] container mx-auto p-4 flex flex-col justify-start">
      <Stories />
    </div>
  );
}
