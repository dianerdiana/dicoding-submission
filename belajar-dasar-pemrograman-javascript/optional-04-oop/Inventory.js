/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

class Inventory {
  items = [];

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemId) {
    const newData = this.items.filter((item) => item.id !== itemId);
    this.items = newData;
  }

  listItems() {
    return this.items.map((item) => item.displayDetails());
  }
}

// Jangan hapus kode di bawah ini!
export default Inventory;
