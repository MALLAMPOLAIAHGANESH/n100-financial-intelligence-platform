import CompanyDetailClient from "./CompanyDetailClient";

export async function generateStaticParams() {
  return [
    { ticker: "RELIANCE" },
    { ticker: "TCS" },
    { ticker: "HDFCBANK" },
    { ticker: "INFY" },
    { ticker: "ICICIBANK" },
    { ticker: "LT" },
    { ticker: "SBIN" },
    { ticker: "ITC" },
    { ticker: "BHARTIARTL" },
    { ticker: "MARUTI" },
  ];
}

export default function CompanyDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  return <CompanyDetailClient params={params} />;
}
