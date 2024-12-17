# Argos Application Note: Using Custom Maps

This document provides an explanation of how to create and install custom maps
in Argos for use by IRIS.

## How to Update Maps in IRIS

To do this, follow these steps:

1. Prepare the Map Files

    - [Convert](#conversion-into-mbtiles-format) your map into the **MBTiles**
      format (required for compatibility with IRIS).
    - Place the MBTiles file, along with any necessary configuration files for
      tileserver-gl, in a dedicated folder.

2. Deploy the Map
    - Transfer the folder to a USB stick.
    - Insert the SD card into the Argos server.
    - The Argos server will automatically parse the files and display the new
      map in IRIS, alongside existing maps, if the files are [correctly
      structured](#file-structure).

## Conversion into **MBTiles** format

If the maps are in custom formats, they must first be converted into MBTiles.
This ensures they are compatible with **tileserver-gl** and the Argos server.

Steps for Conversion:

1. Use tools such as [MapTiler] or [GDAL] to convert maps from formats like
   GeoTIFF, SHP, or others into MBTiles.
2. Once converted, test the [MBTiles locally using
   **tileserver-gl**](#testing-maps-locally-with-tileserver-gl) to ensure they
   display correctly.

## File Structure

Refer to [TileServer GL] documentation (version 3.1.1).

One way to get started with your own mbtiles file is to copy an existing map
from our USB stick and modify it to fit your mbtiles file.

That is:

1. Copy e.g. OSM_World from MyDefence USB stick (already mounted in Argos server)
2. Delete OSM_World/tiles/tiles_joined.mbtiles
3. Place your own mbtiles-file in OSM_World/tiles/
4. Change all occurrences of "tiles_joined.mbtiles" in config.json to match your mbtiles file
5. Change 'id' to something unique in all styles in OSM_World/styles/
6. In config.json adjust "bounds" to match your mbtiles

Note that contours_joined.mbtiles and landcover.mbtiles are not to be deleted
unless all references to them are also removed in both config.json and styles

## Testing Maps Locally with Tileserver-GL

To verify that the MBTiles file works as expected before uploading to the Argos server:

1.  Install **tileserver-gl** locally using Docker:

        docker run --rm -it -v /your/local/config/path:/data -p 8080:8080 maptiler/tileserver-gl:v3.1.1

    -   Replace `/your/local/config/path` with the folder path where your MBTiles file is stored.

2.  Open a web browser and go to http://localhost:8080 to view and test the map.

## Supported File Formats

IRIS and tileserver-gl support **MBTiles** as the primary file format for maps.
If your map is inanother format, it must be converted to MBTiles.

### Examples of Common Formats That Need Conversion:

-   GeoTIFF
-   SHP (Shapefiles)
-   PNG/JPEG tile sets

Conversion tools such as MapTiler or GDAL can simplify this process.

[MapTiler]: https://www.maptiler.com/
[GDAL]: https://gdal.org/en/stable/
[TileServer GL]: https://tileserver.readthedocs.io/en/latest/
