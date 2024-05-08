import { Selector, ClientFunction } from "testcafe";

fixture("Testing my Todo-Application").page(
    "http://localhost:5173/app-todo-this/"
);

test("🧪 First test in my todo-application", async (t) => {
    const getItem = ClientFunction(() => {
        return localStorage.getItem("key.selectedListId");
    });

    const addToList = Selector("main img").withAttribute(
        "src",
        "/app-todo-this/svg/plus.svg"
    );

    await t
        .typeText(
            Selector("main").find("input"),
            "Gandalf is coming for Mordor!"
        )
        .wait(1000)
        .click(addToList)
        .wait(1000);

    const selectedListId = await getItem();
    console.log(selectedListId);
});

// I wanted to log out 10, but i couldn't find a way
// window.localStorage.getItem('task.selectedListId')
