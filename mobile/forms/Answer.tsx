import { ThemedView } from "@/common/ThemedView";
import { ThemedInput } from "@/common/ThemedInput";
import { Controller } from "react-hook-form";
import { useAnswerForm } from "@/hooks/forms/useAnswerForm";
import { StyleSheet } from "react-native";
import { ThemedButton } from "@/common/ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export function AnswerForm({
  control,
  onSubmit,
  loading,
}: { editable: boolean; onSubmit: () => {}; loading: boolean } & Pick<
  ReturnType<typeof useAnswerForm>,
  "control"
>) {
  const color = useThemeColor({}, "icon");
  return (
    <ThemedView style={styles.inputContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedView style={styles.input}>
            <ThemedInput
              type="defaultSemiBold"
              placeholder="Write an reply"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          </ThemedView>
        )}
        name="answer"
      />
      <ThemedView>
        <ThemedButton
          icon={<Ionicons name="send-outline" color={color} size={18} />}
          onPress={onSubmit}
          loading={loading}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 80,
    paddingTop: 10,
  },
  input: { width: "100%", maxWidth: "80%" },
});
