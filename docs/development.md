# Passkey

Tentang:
- Aplikasi demo untuk menjelaskan mekanisme passkey secara sederhana

MVP:
- User bisa login dengan username + password
- User bisa register passkey (setelah login)
- User bisa login dengan username + passkey

Batasan:
- Tidak ada fitur daftar akun baru

## Server

Tentang:
- BE untuk proses auth dan passkey

MVP:
- Login
- Get user
- Logout
- Start
- Register passkey
- Login passkey

Batasan:
- Tidak ada DB, data di hard-code atau di store di runtime

## Client

Tentang:
- FE untuk mendemokan proses passkey

MVP:
- Halaman untuk login.
    - Ada 2 tabs:
        - Login dengan password
            - Login menggunakan username + password.
        - Login dengan passkey
            - Login menggunakan username + passkey.
- Halaman home.
    - Komponen:
        - Nama user.
        - Tombol "Register Passkey" apabila user belum register passkey di device ini.
        - Tombol logout.
