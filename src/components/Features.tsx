const Features = () => {
  const features = [
    {
      title: "Huge Collection",
      description: "Thousands of titles from every genre at your fingertips.",
    },
    {
      title: "User Reviews",
      description: "Get real opinions from passionate readers.",
    },
    {
      title: "Personalized Shelf",
      description: "Save and track your favorite books.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose BookHaven?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
