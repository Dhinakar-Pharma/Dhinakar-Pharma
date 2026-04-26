import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: id
    }
  });

  return <ProductDetailClient product={product} />;
}
