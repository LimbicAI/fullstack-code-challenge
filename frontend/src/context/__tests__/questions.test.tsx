import { reducer } from "../questions";
import * as api from "../../api/questions";

jest.mock("../../api/questions");

const emptyState = {
  questions: [],
};

const testState = {
  questions: [{ id: 1, question: "Test 1" }],
};

describe("Questions Reducer", () => {
  test("LIST_RESPONSE", () => {
    const state = reducer(emptyState, {
      type: "LIST_RESPONSE",
      payload: { questions: testState.questions },
    });

    expect(state).toEqual(testState);
  });

  test("CREATE", async () => {
    const callback = jest.fn();

    (api.create as jest.Mock).mockImplementation(() =>
      Promise.resolve({ test: "test" })
    );

    reducer(emptyState, {
      type: "CREATE",
      payload: { question: "Test 1", callback },
    });

    // Wait for `then()` to trigger
    await new Promise(process.nextTick);

    expect(api.create).toHaveBeenLastCalledWith("Test 1");
    expect(callback).toHaveBeenCalledWith({ test: "test" });
  });

  test("CREATE_RESPONSE", () => {
    const state = reducer(emptyState, {
      type: "CREATE_RESPONSE",
      payload: { id: 1, question: "Test 1", success: true },
    });

    expect(state).toEqual(testState);
  });

  test("EDIT", async () => {
    const callback = jest.fn();

    (api.edit as jest.Mock).mockImplementation(() =>
      Promise.resolve({ test: "test" })
    );

    reducer(testState, {
      type: "EDIT",
      payload: { id: 1, question: "Test 2", callback },
    });

    // Wait for `then()` to trigger
    await new Promise(process.nextTick);

    expect(api.edit).toHaveBeenLastCalledWith({ id: 1, question: "Test 2" });
    expect(callback).toHaveBeenCalledWith({ test: "test" });
  });

  test("EDIT_RESPONSE", () => {
    const state = reducer(testState, {
      type: "EDIT_RESPONSE",
      payload: { id: 1, question: "Test 2", success: true },
    });

    expect(state.questions[0]).toEqual({ id: 1, question: "Test 2" });
  });

  test("DELETE", async () => {
    const callback = jest.fn();

    (api.del as jest.Mock).mockImplementation(() =>
      Promise.resolve({ test: "test" })
    );

    const state = reducer(testState, {
      type: "DELETE",
      payload: { id: 1, callback },
    });

    // Wait for `then()` to trigger
    await new Promise(process.nextTick);

    expect(state.questions).toHaveLength(0);
    expect(api.del).toHaveBeenLastCalledWith(1);
    expect(callback).toHaveBeenCalledWith({ test: "test" });
  });
});
