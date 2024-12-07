import { About } from "../../components/about/about";
import { Cover } from "../../components/cover/cover";
import { Events } from "../../components/events/events";
import { Layout } from "../../components/layout/layout";
import { Media } from "../../components/media/media";
import { LineUI } from "../../components/ui/line-ui/line-ui";

export const Home = () => {
  return (
    <div>
      <Layout>
        <Cover />
        <About />
        <LineUI />
        <Events />
        <LineUI />
        <Media />
      </Layout>
    </div>
  );
};