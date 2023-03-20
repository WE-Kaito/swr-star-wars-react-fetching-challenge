import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Character() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const router = useRouter();
  const {id = 1} = router.query;
  const url = `https://swapi.dev/api/people/${id}`
  const {data, isLoading, error, mutate} = useSWR(url, fetcher);
  const char = {...data};

  if(isLoading) <Layout><p>Loading...</p></Layout>;

  if(error) {
    console.error(error);
    return <Layout><p>An error occured!</p></Layout>
  }
  console.log(char.name)

  return (
    <Layout>
      <Card
        id={id}
        name={char.name}
        height={char.height}
        eyeColor={char.eye_color}
        birthYear={char.birth_year}
      />
    </Layout>
  );
}
