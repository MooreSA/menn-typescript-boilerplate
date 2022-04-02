import { useState } from "react";
import { MenuItem, Select, Snackbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const View = (props) => {
  const [meals, setMeals] = useState(props.meals);
  const [chosenTime, setChosenTime] = useState(0);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    const res = await fetch("/api/deleteItem/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const json = await res.json();

    if (res.ok) {
      setError(null);
      setOpen(true);
      setChosenTime(0);
      setMeals(meals.filter((meal) => meal._id !== id));
    } else {
      setError("Error: " + json.message);
    }
  };

  return (
    <Box>
      <h1>Your Meals</h1>
      <Link href="add">Add More</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Snackbar
        open={open}
        message="Item Deleted"
        onClose={() => setOpen(false)}
      />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <Select
          value={chosenTime}
          onChange={(e) => setChosenTime(e.target.value)}
        >
          <MenuItem value="0">Breakfast</MenuItem>
          <MenuItem value="1">Lunch</MenuItem>
          <MenuItem value="2">Dinner</MenuItem>
        </Select>
      </Box>
      <TableContainer
        sx={{ maxWidth: "95%", width: "650px" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "black", color: "#fff" }}
                scope="col"
              >
                Food name
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "black", color: "#fff" }}
                scope="col"
                align="right"
              >
                Calories
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "black", color: "#fff" }}
                scope="col"
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((meal) => {
              if (meal.meal == chosenTime) {
                return (
                  <TableRow
                    key={meal._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th">{meal.name}</TableCell>
                    <TableCell align="right">{meal.calories}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(meal._id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/getMeals");
  const json = await res.json();
  return {
    props: {
      meals: json.data.meals,
    },
  };
}

export default View;
