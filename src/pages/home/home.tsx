import { About } from "../../components/about/about";
import { Cover } from "../../components/cover/cover";
import { Events } from "../../components/events/events";
import { Layout } from "../../components/layout/layout";

export const Home = () => {
  return (
    <div>
      <Layout>
        <Cover />
        <About />
        <Events />
      </Layout>
    </div>
  );
};