

 function inittable(dtid){   

    const datatablesSimple = document.getElementById(dtid);
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }

}