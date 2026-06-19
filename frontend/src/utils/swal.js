import Swal from "sweetalert2";

export const successAlert = message => {
    Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        confirmButtonColor: "#3085d6"
    });
};

export const errorAlert = message => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#d33"
    });
};
