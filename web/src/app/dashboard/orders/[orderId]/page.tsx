import { OrderDetail } from "./OrderDetail";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: PageProps) {
  const { orderId } = await params;
  return <OrderDetail orderId={orderId} />;
}
