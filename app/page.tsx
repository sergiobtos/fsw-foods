import { ChevronsRightIcon } from "lucide-react";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import ProductList from "./_components/product-list";
import PromoBanner from "./_components/promo-banner";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>

      <div className="space-y-3 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            className="h-fit p-0 text-primary hover:bg-transparent"
            variant="ghost"
          >
            Ver todos
            <ChevronsRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
