import { render,screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Expense from "./Expense";

describe("testing the Expense", () => {
    test("test1", () => {
        render(<Expense/>);
        const premiumButton = screen.getByText("Premium", {exact: false});
        userEvent.click(premiumButton);

        const output = screen.getByText("Total", {exact: false});
        expect(output).toBeInTheDocument();
    })
})