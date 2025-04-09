var vantaEffect = null;

document.addEventListener("DOMContentLoaded", function () {
    vantaEffect = VANTA.NET({
        el: ".vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        color: 0x000066ff,
        backgroundColor: 0x0a0a1a,
        points: 5.0,
        maxDistance: 20.0,
        spacing: 20.0,
    });

    window.addEventListener("resize", function () {
        vantaEffect.resize();
    });
});