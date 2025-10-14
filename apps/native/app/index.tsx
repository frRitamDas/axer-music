import { Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";

import { trpc } from "~/lib/trpc";

const Home: React.FC = () => {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-2xl">Home</Text>
      <Text>{healthCheck.data}</Text>
    </View>
  );
};

export default Home;
