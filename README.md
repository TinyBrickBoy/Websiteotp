# Website

### Page Layout

```tsx
import TopPage from "@/components/page/top";

export default function Page() {
  return (
    <section className="bg-gray-950 h-screen">
      <TopPage />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-5">HEADING</h1>
        <p>Content</p>
      </div>
    </section>
  );
}
```
