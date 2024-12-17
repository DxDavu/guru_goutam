export const specificationData = {
    "products": [
      {
        "type": "laptop",
        "name": "Dell XPS 13",
        "brand": "Dell",
        "model": "XPS 13 9310",
        "specifications": {
          "processor": "Intel Core i7-1165G7",
          "ram": "16 GB LPDDR4x",
          "storage": "512 GB SSD",
          "display": {
            "size": "13.4 inches",
            "resolution": "1920 x 1200"
          },
          "graphics": "Intel Iris Xe Graphics",
          "battery_life": "Up to 14 hours"
        },
        "price": "$1,199.99",
        "availability": "In stock"
      },
      {
        "type": "desktop",
        "name": "HP Pavilion Desktop",
        "brand": "HP",
        "model": "TP01-0050",
        "specifications": {
          "processor": "AMD Ryzen 5 3500",
          "ram": "8 GB DDR4",
          "storage": {
            "type": "HDD",
            "capacity": "1 TB"
          },
          "graphics": {
            "type": "NVIDIA GeForce GTX 1650",
            "memory": "4 GB"
          },
          "operating_system": "Windows 10 Home"
        },
        "price": "$649.99",
        "availability": "In stock"
      },
      {
        "type": "monitor",
        "name": "LG UltraFine 5K Display",
        "brand": "LG",
        "model": "27MD5KL-B",
        "specifications": {
          "size": "27 inches",
          "resolution": "5120 x 2880",
          "panel_type": "IPS",
          "refresh_rate": 60,
          "connectivity_ports": [
            {"type": "Thunderbolt 3", "count": 1},
            {"type": "USB-C", "count": 3}
          ]
        },
        "price": "$1,299.99",
        "availability": "Out of stock"
      }
    ]
  }

//   import DashboardSkeleton from '@/app/ui/skeletons';
 
// export default function Loading() {
//   return <DashboardSkeleton />;
// }