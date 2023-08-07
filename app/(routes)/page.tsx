import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Button from "@/components/ui/button";
import VideoPlayer from "@/components/ui/video";
import ModalDiscount from "@/components/ui/modal-discount";
export const revalidate = 0;

const Hompage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("e98cd97f-811f-426e-82b2-a18f57edea0c");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex justify-center">
          <VideoPlayer />
        </div>
        <div className="flex justify-center ">
          <ModalDiscount />
        </div>
        <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="สินค้าแนะนำ" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Hompage;
