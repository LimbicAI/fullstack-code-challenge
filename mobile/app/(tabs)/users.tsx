import { ActivityIndicator, ListRenderItem, StyleSheet } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/store/graphql/queries";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import { UsersQuery } from "@/gql/__generated__/graphql";
import { Link } from "expo-router";

const User: ListRenderItem<UsersQuery["users"][0]> = ({ item }) => {
  return (
    <ThemedView style={{ paddingVertical: 4 }}>
      <Link
        href={{
          pathname: "/user/[user]",
          params: item,
        }}
      >
        <ThemedText type="link">{item.name}</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default function UsersScreen() {
  const { loading, data, refetch, fetchMore } = useQuery(GET_USERS, {
    variables: { offset: 0, limit: 10 },
  });

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={data?.users}
        renderItem={User}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch({ limit: 10, offset: 0 })}
          />
        }
        ListFooterComponent={
          <ActivityIndicator animating={loading} hidesWhenStopped />
        }
        ListHeaderComponent={() => (
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Reach out.</ThemedText>
          </ThemedView>
        )}
        stickyHeaderIndices={[0]}
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.users?.length } })
        }
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 10, paddingTop: 30 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  otter: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    position: "absolute",
  },
});
