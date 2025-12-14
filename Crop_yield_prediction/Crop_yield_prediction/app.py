# app.py
import streamlit as st
import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt

st.set_page_config(page_title="KRISHI-AI", layout="wide", initial_sidebar_state="expanded")

# ---------------------
# Custom styles (simple)
# ---------------------
st.markdown(
    """
    <style>
    .header {
        background: linear-gradient(90deg,#2b9348,#55a630);
        padding: 18px;
        border-radius: 10px;
        color: white;
    }
    .card {
        border-radius: 10px;
        padding: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        background-color: #ffffff;
    }
    .small-muted { color: #6b7280; font-size:12px; }
    </style>
    """,
    unsafe_allow_html=True,
)

# ---------------------
# Header
# ---------------------
st.markdown('<div class="header"><h1 style="margin:0;">🌾 AI Crop Yield Predictor — Prototype</h1>'
            '<div class="small-muted">Predict yield, production & revenue — and get actionable farming recommendations</div>'
            '</div>', unsafe_allow_html=True)
st.write("")  # spacing

# ---------------------
# Load model + encoders
# ---------------------
try:
    model = joblib.load("crop_yield_model.pkl")
    encoders = joblib.load("encoders.pkl")
except Exception as e:
    st.error("Could not load model/encoders. Make sure crop_yield_model.pkl and encoders.pkl are in the app folder.")
    st.stop()

# helper to safely get encoder classes
def encoder_classes(encoders, key):
    try:
        return list(encoders[key].classes_)
    except Exception:
        return []

# ---------------------
# Two-column step inputs
# ---------------------
col1, col2 = st.columns(2)

with col1:
    st.subheader("Step 1 — Crop & Location")
    with st.container():
        crop = st.selectbox("Crop", encoder_classes(encoders, 'Crop_Type'))
        district = st.selectbox("District", encoder_classes(encoders, 'District'))
        season = st.selectbox("Season", encoder_classes(encoders, 'Season'))
        irrigation = st.selectbox("Irrigation Method", encoder_classes(encoders, 'Irrigation_Method'))

with col2:
    st.subheader("Step 2 — Soil & Weather")
    with st.container():
        soil_pH = st.number_input("Soil pH", min_value=0.0, max_value=14.0, step=0.1, value=6.5)
        soil_N = st.number_input("Soil Nitrogen (N)", min_value=0.0, step=0.1, value=10.0)
        soil_P = st.number_input("Soil Phosphorus (P)", min_value=0.0, step=0.1, value=15.0)
        soil_K = st.number_input("Soil Potassium (K)", min_value=0.0, step=0.1, value=120.0)
        rainfall_mm = st.number_input("Recent Rainfall (mm)", min_value=0.0, step=1.0, value=100.0)
        temperature_C = st.number_input("Temperature (°C)", min_value=-10.0, max_value=60.0, step=0.5, value=25.0)
        humidity_pct = st.number_input("Humidity (%)", min_value=0.0, max_value=100.0, step=1.0, value=60.0)
        sunlight_hours = st.number_input("Sunlight Hours", min_value=0.0, max_value=24.0, step=0.1, value=8.0)
        ndvi = st.number_input("NDVI Index", min_value=0.0, max_value=1.0, step=0.01, value=0.5)

st.write("")  # spacing

# ---------------------
# Area & Market (Step 3) — wider row split
# ---------------------
s1, s2, s3 = st.columns([1,1,1])
with s1:
    st.subheader("Step 3 — Area & Inputs")
    area = st.number_input("Area (hectares)", min_value=0.01, step=0.1, value=1.0)
    seed_used = st.number_input("Seed Used (kg)", min_value=0.0, step=0.1, value=0.0)
with s2:
    st.subheader("Fertilizer & Price")
    fertilizer_use = st.number_input("Fertilizer Use (kg/ha)", min_value=0.0, step=0.1, value=0.0)
    rs_per_kg = st.number_input("Market Price (₹/kg)", min_value=0.0, step=0.5, value=30.0)
with s3:
    st.subheader("Advanced / Optional")
    with st.expander("Advanced options & notes"):
        st.write("- If your training included other numeric columns, app will try to align automatically.")
        st.write("- Area is in hectares; model expects yield in kg/ha (so production = yield * area).")

st.write("")  # spacing

# ---------------------
# Centered Predict Button
# ---------------------
b1, b2, b3 = st.columns([1,1,1])
with b2:
    predict_btn = st.button("🔍 Predict & Recommend", key="predict")

# ---------------------
# Utilities
# ---------------------
def safe_transform(enc, value):
    try:
        return int(enc.transform([value])[0])
    except Exception:
        # if transform fails, try to map with classes_ index or fallback 0
        try:
            classes = list(enc.classes_)
            return int(classes.index(value))
        except Exception:
            return 0

def get_recommendations(d):
    recs = []
    # Irrigation
    if d['rainfall_mm'] < 100:
        recs.append("💧 Use drip irrigation for ~20% water savings and better nutrient uptake.")
    else:
        recs.append("💧 Rainfall level looks good — still monitor soil moisture and use mulching.")

    # Fertilization
    if d['Soil_N'] < 10:
        recs.append("🌱 Increase Nitrogen: Apply ~120kg N/ha (split into 2–3 doses).")
    else:
        recs.append("🌱 Maintain balanced NPK application and use compost for soil health.")

    # Pest control
    if d['humidity_%'] > 75:
        recs.append("🐛 High humidity — monitor disease/pests weekly; use neem-based sprays when needed.")
    else:
        recs.append("🐛 Regular weekly scouting recommended; use pheromone traps for stem borer.")

    # Timing / other
    recs.append("📅 Sow within the first 15 days of monsoon and harvest before heavy rains.")
    recs.append("🧪 Consider simple soil test every season and use fertigation if available.")
    return recs

# ---------------------
# Prediction logic
# ---------------------
if predict_btn:
    # Build input dict
    raw = {
        'District': 0,
        'Crop_Type': 0,
        'Season': 0,
        'Irrigation_Method': 0,
        'Soil_pH': float(soil_pH),
        'Soil_N': float(soil_N),
        'Soil_P': float(soil_P),
        'Soil_K': float(soil_K),
        'rainfall_mm': float(rainfall_mm),
        'temperature_C': float(temperature_C),
        'humidity_%': float(humidity_pct),
        'sunlight_hours': float(sunlight_hours),
        'NDVI_index': float(ndvi),
        'Area': float(area),
        'Seed_Used': float(seed_used),
        'Fertilizer_Use': float(fertilizer_use),
        'Rs/kg': float(rs_per_kg)
    }

    # Encode categoricals safely
    try:
        raw['District'] = safe_transform(encoders['District'], district)
        raw['Crop_Type'] = safe_transform(encoders['Crop_Type'], crop)
        raw['Season'] = safe_transform(encoders['Season'], season)
        raw['Irrigation_Method'] = safe_transform(encoders['Irrigation_Method'], irrigation)
    except Exception:
        # fallback if keys missing
        pass

    input_df = pd.DataFrame([raw])

    # If model has feature_names_in_, reindex to match training column order (fills missing with 0)
    if hasattr(model, "feature_names_in_"):
        try:
            cols = list(model.feature_names_in_)
            input_df = input_df.reindex(columns=cols, fill_value=0)
        except Exception:
            # if reindex fails, keep as-is
            pass

    # Ensure numeric dtypes
    for c in input_df.columns:
        if input_df[c].dtype == object:
            try:
                input_df[c] = pd.to_numeric(input_df[c])
            except Exception:
                pass

    # Predict (with spinner)
    try:
        with st.spinner("Predicting..."):
            pred_yield = model.predict(input_df)[0]
    except Exception as e:
        st.error(f"Prediction failed: {e}")
        st.stop()

    # Derived outputs
    production_tons = (pred_yield * area) / 1000.0   # kg/ha * ha -> kg -> tons
    profit_total = pred_yield * area * rs_per_kg
    profit_per_kg = rs_per_kg
    profit_per_quintal = rs_per_kg * 100
    profit_per_ton = rs_per_kg * 1000

    # Top metrics row
    m1, m2, m3 = st.columns(3)
    m1.metric("Predicted Yield (kg/ha)", f"{pred_yield:,.2f}")
    m2.metric("Estimated Production (tons)", f"{production_tons:,.2f}")
    m3.metric("Estimated Profit (₹/ha)", f"{profit_total:,.2f}")

    st.write("")  # spacing

    # More detailed numbers in two columns
    left, right = st.columns([2,1])
    with left:
        st.subheader("Detailed Results")
        st.write(f"- **Profit per kg:** ₹{profit_per_kg:.2f}")
        st.write(f"- **Profit per quintal:** ₹{profit_per_quintal:,.2f}")
        st.write(f"- **Profit per ton:** ₹{profit_per_ton:,.2f}")
        st.write(f"- **Area used for calculation:** {area} ha")
        st.write(f"- **Input summary:** Soil N={soil_N}, P={soil_P}, K={soil_K} | Rainfall={rainfall_mm} mm | Temp={temperature_C}°C")

        # small bar chart: profit breakdown
        fig, ax = plt.subplots()
        labels = ["₹/kg", "₹/qtl", "₹/ton"]
        vals = [profit_per_kg, profit_per_quintal, profit_per_ton]
        ax.bar(labels, vals)
        ax.set_title("Profit Units (visual)")
        st.pyplot(fig)

    with right:
        st.subheader("Recommendations")
        recs = get_recommendations({
            'rainfall_mm': rainfall_mm,
            'Soil_N': soil_N,
            'humidity_%': humidity_pct
        })
        # show as cards (two-column inside)
        rcol1, rcol2 = st.columns(2)
        for i, rec in enumerate(recs):
            target = rcol1 if i % 2 == 0 else rcol2
            with target:
                st.info(rec)

    # Download results button
    result_json = {
        "predicted_yield_kg_per_ha": float(pred_yield),
        "production_tons": float(production_tons),
        "profit_total_rs_per_ha": float(profit_total),
        "area_ha": float(area),
        "crop": crop,
        "district": district
    }
    st.download_button("⬇️ Download results (JSON)", data=pd.Series(result_json).to_json(), file_name="prediction_result.json", mime="application/json")

    st.success("Done — use the recommendations to plan irrigation/fertilizer/pest control. Good luck!")
    st.write("")  # spacing
    st.caption("Tip: For deployment, push this folder (app.py + .pkl files) to Streamlit Cloud or Render for a shareable link.")
