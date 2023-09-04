import { subscribe, unsubscribe, publish } from "./event";

describe("Pruebas para las funciones de eventos", () => {
  let eventName;
  let listener;
  beforeEach(() => {
    eventName = "MyEvent";
    listener = jest.fn();
  });

  it("should correctly subscribe a listener to the event", () => {
    window.document.addEventListener = jest.fn();

    subscribe(eventName, listener);

    expect(window.document.addEventListener).toHaveBeenCalledWith(
      eventName,
      listener
    );
  });

  test("should unsubscribe correctly remove a listener from the event", () => {
    window.document.removeEventListener = jest.fn();

    unsubscribe(eventName, listener);

    expect(window.document.removeEventListener).toHaveBeenCalledWith(
      eventName,
      listener
    );
  });

  test("should correctly fire the publish event with the supplied data", () => {
    window.document.dispatchEvent = jest.fn();

    const data = { mensaje: "test" };

    publish(eventName, data);

    expect(window.document.dispatchEvent).toHaveBeenCalledWith(
      new CustomEvent(eventName, { detail: data })
    );
  });
});
