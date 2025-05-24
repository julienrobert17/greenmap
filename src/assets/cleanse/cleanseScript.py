import pandas as pd
import json
import numpy as np

# 1. Charger le fichier CSV
df = pd.read_csv("merged_with_iso2.csv")

# 2. Formater les geo_id
def format_geo_id(val):
    try:
        return f"{int(float(val)):03}"
    except:
        return None

df["geo_id"] = df["geo_id"].apply(format_geo_id)

# 3. Nettoyer les noms d'entité
df["Entity"] = df["Entity"].str.strip()

# 4. Vérifier unicité
if df["Entity"].duplicated().any():
    raise ValueError("❗ 'Entity' contient des doublons.")

# 5. Remplacer tous les NaN/NaT/inf par None (valide en JSON)
df = df.replace({np.nan: None, np.inf: None, -np.inf: None})

# 6. Créer le dict indexé par Entity
data_dict = df.set_index("Entity").to_dict(orient="index")

# 7. Exporter le JSON
with open("map_data_by_entity.json", "w", encoding="utf-8") as f:
    json.dump(data_dict, f, ensure_ascii=False, indent=2)

print("✅ JSON généré proprement : map_data_by_entity.json")
