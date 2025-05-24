import pandas as pd

# Charger ton fichier CSV existant
df = pd.read_csv("MANUAL - merged_with_geo_id_corrected.csv")

# Charger le fichier de correspondance ISO alpha-3 → alpha-2
iso_df = pd.read_csv("all.csv")  # Assure-toi que ce fichier est dans le même répertoire

# Renommer les colonnes pour faciliter la fusion
iso_df.rename(columns={"alpha-3": "Code", "alpha-2": "Code_alpha2"}, inplace=True)

# Fusionner les deux DataFrames sur la colonne 'Code' (ISO alpha-3)
df = df.merge(iso_df[["Code", "Code_alpha2"]], on="Code", how="left")

# Remplacer les valeurs manquantes par 'NAN'
df["Code_alpha2"] = df["Code_alpha2"].fillna("NAN")

# Sauvegarder le fichier enrichi
df.to_csv("merged_with_iso2.csv", index=False)

print("✅ Fichier enrichi : merged_with_iso2.csv")