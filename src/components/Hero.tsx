import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-indigo-100 to-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover Your Next Favorite Book
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
        Explore thousands of books from every genre. Sign up to save your
        favorites, review books, and connect with other readers.
      </p>
      <div className="flex gap-4">
        <Button variant="default">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
};

export default Hero;
