import Layout from "../../components/Layouts/Layout";

const RoomResource = () => {
  return <div>RoomResource</div>;
};

export default RoomResource;

RoomResource.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
