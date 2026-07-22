import React from 'react'

export default function Home(){
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Delight Treats</h1>
      <p className="text-lg text-gray-700">Freshly Baked Happiness Delivered Daily.</p>
      <section className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">Placeholder card</div>
          <div className="p-6 border rounded-lg">Placeholder card</div>
          <div className="p-6 border rounded-lg">Placeholder card</div>
        </div>
      </section>
    </main>
  )
}
