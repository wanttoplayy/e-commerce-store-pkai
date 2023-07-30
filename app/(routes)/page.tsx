import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/ui/billboard";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

const Hompage = async () => {
  const product = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("0ceb04ff-4adf-45a4-be15-790cf2e6efee");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"></div>
    </Container>
  );
};

export default Hompage;
