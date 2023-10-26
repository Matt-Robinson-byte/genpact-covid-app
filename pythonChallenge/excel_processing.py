import tkinter as tk
from tkinter import filedialog
import pandas as pd
from openpyxl import Workbook
from openpyxl.styles import NamedStyle

# Create a Tkinter window
root = tk.Tk()
root.title("Excel Automation")


# Function to load and process sales data
def process_sales_data():
    file_path = filedialog.askopenfilename(filetypes=[("Text Files", "*.txt")])
    if file_path:
        try:
            # Load data from the file into a pandas DataFrame
            df = pd.read_csv(
                file_path, delimiter="  "
            )  # Modify the delimiter to match your data

            # Calculate total sales amount and total quantity sold for each product
            summary_sales = df.groupby("Product")["Sales Amount"].sum().reset_index()
            summary_quantity = (
                df.groupby("Product")["Quantity Sold"].sum().reset_index()
            )

            # Create a new Excel workbook
            workbook = Workbook()
            writer = pd.ExcelWriter("sales_summary.xlsx", engine="python")
            writer.book = workbook

            # Create styles for formatting
            currency_style = NamedStyle(name="currency", number_format="$#,##0.00")
            writer.sheets = dict((ws.title, ws) for ws in workbook.worksheets)

            # Write summary data to Excel sheets
            summary_sales.to_excel(writer, sheet_name="Total Sales", index=False)
            summary_quantity.to_excel(
                writer, sheet_name="Total Quantity Sold", index=False
            )

            # Apply formatting
            for sheet in writer.sheets:
                for cell in writer.sheets[sheet]["1"]:
                    cell.style = currency_style

            # Save the Excel file
            writer.save()

            result_label.config(text="Process completed. Check 'sales_summary.xlsx'")
        except Exception as e:
            result_label.config(text=f"Error: {str(e)}")


# Create a button to load and process sales data
process_button = tk.Button(root, text="Process sales data", command=process_sales_data)
process_button.pack()

# Label to display the result or error message
result_label = tk.Label(root, text="")
result_label.pack()

root.mainloop()
