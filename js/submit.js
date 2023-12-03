$("#Udetails").submit(function(e) {
    e.preventDefault();
    price = 200;
    amount = 0;
    name = $(".uname").val();
    email = $(".uemail").val();
    mob = $(".unum").val();
    institute = $(".uinstitute").val();
    usn = $(".uusn").val();
    techevents = $(".techevents").val();
    culturalevents = $(".culturalevents").val();
    specialevents = $(".specialevents").val();
    events = [...techevents, ...culturalevents, ...specialevents];

    if (techevents.length > 0 || culturalevents.length > 0) {
        amount += price;
    }
    if (specialevents.length > 0) {
        amount += price;
    }
    const rzAmount = amount * 100;

    var settings = {
        url: "http://localhost:8080/register/create-order/",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            amount: rzAmount,
            name: name,
            email: email,
            phone: mob,
            institute: institute,
            events: events,
            usn: usn,
        }),
    };
    orderId = "afsc784";

    // $.ajax(settings).done(function(response) {
    //     orderId = "Working";
    //     // orderId = response.orderId;
    // });

    document.getElementById("OTPModal").style.display = "flex";
});

$("#check").submit(function(e) {
    e.preventDefault();
    const cnfEmail = $(".cnfEmail").val();

    var options = {
        key: "rzp_test_QAj8UupFhX29Ay",
        amount: amount,
        currency: "INR",
        name: "Sambhram 2022",
        description: "Register for Sambhram22",
        image: "https://sdc.ac.in/sdit/wp-content/themes/twentyten/images/shree_devi_institution_images/shreeDevi_logo.jpg",
        order_id: orderId,
        callback_url: "http://localhost:8080/register/success",
        prefill: {
            name: name,
            email: email,
            contact: mob,
        },
        theme: {
            color: "#3399cc",
        },
    };

    if (email === cnfEmail) {
        document.getElementById("OTPModal").style.display = "none";
        var rzp1 = new Razorpay(options);
        rzp1.open();

        $("#Udetails")[0].reset();
        techevents = [];
        culturalevents = [];
        specialevents = [];
        events = [];
        $(".cnfEmail").val("");
    } else {
        $(".cnfEmail").css("border", "3px solid #f00");
    }
});