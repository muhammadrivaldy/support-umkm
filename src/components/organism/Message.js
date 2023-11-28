/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, ListItem} from '@ui-kitten/components';

const styles = StyleSheet.create({
  itemImage: {
    tintColor: null,
  },
});

function ListItemSimpleUsageShowcase({name, lastChat}) {
  const iconList = props => {
    return (
      <Avatar
        {...props}
        style={[props.style, styles.itemImage]}
        source={require('../../assets/profile.png')}
      />
    );
  };

  return (
    <ListItem
      title={name}
      description={lastChat}
      accessoryLeft={iconList}
      accessoryRight={() => {
        <Button size="tiny">INSTALL</Button>;
      }}
    />
  );
}

export function MessageScreen({navigation}) {
  var chats = [];

  exampleChats.forEach((value, index, array) => {
    chats.push(
      <ListItemSimpleUsageShowcase
        key={index}
        name={value.name}
        lastChat={value.lastChat}
      />,
    );
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: 'white'}}>{chats}</ScrollView>
    </SafeAreaView>
  );
}

const exampleChats = [
  {
    name: 'Bang Bakso',
    lastChat: 'Iya sebentar lagi sudah sampai rumah',
  },
  {
    name: 'Bu Siti',
    lastChat: 'Apa kabar, sudah makan belum?',
  },
  {
    name: 'Pak Joko',
    lastChat: 'Hari ini cuaca bagus ya',
  },
  {
    name: 'Ibu Rahma',
    lastChat: 'Sudah siap untuk rapat besok?',
  },
  {
    name: 'Mas Budi',
    lastChat: 'Terima kasih banyak atas rekomendasinya',
  },
  {
    name: 'Mbak Rina',
    lastChat: 'Segera kirimkan proposal tersebut',
  },
  {
    name: 'Pak Agus',
    lastChat: 'Tolong bawa dokumen-dokumen penting itu',
  },
  {
    name: 'Bu Indah',
    lastChat: 'Bagaimana kabar keluarga?',
  },
  {
    name: 'Mas Eko',
    lastChat: 'Jangan lupa beli bahan-bahan untuk masakan',
  },
  {
    name: 'Ibu Ani',
    lastChat: 'Terima kasih banyak atas bantuannya!',
  },
  {
    name: 'Pak Slamet',
    lastChat: 'Besok ada pertemuan penting, persiapkan diri ya',
  },
  {
    name: 'Bu Yanti',
    lastChat: 'Selamat ulang tahun! Semoga panjang umur dan sehat selalu',
  },
  {
    name: 'Mas Surya',
    lastChat: 'Jangan lupa kumpulkan laporan mingguan',
  },
  {
    name: 'Ibu Widya',
    lastChat: 'Tolong antar anak-anak ke sekolah pagi ini',
  },
  {
    name: 'Pak Ari',
    lastChat: 'Ada update terbaru mengenai proyek tersebut',
  },
  {
    name: 'Bu Dian',
    lastChat: 'Maafkan aku jika ada kesalahan kemarin',
  },
  {
    name: 'Mas Adi',
    lastChat: 'Sudah cek email belum? Ada info penting dari atasan',
  },
  {
    name: 'Ibu Maya',
    lastChat: 'Besar harapan kita proyek ini sukses',
  },
  {
    name: 'Pak Hadi',
    lastChat: 'Terimakasih atas kerjasamanya selama ini',
  },
  {
    name: 'Bu Nita',
    lastChat: 'Anak-anak sudah pulang sekolah belum?',
  },
  {
    name: 'Bang Bakso',
    lastChat: 'Iya sebentar lagi sudah sampai rumah',
  },
  {
    name: 'Bu Siti',
    lastChat: 'Apa kabar, sudah makan belum?',
  },
  {
    name: 'Pak Joko',
    lastChat: 'Hari ini cuaca bagus ya',
  },
  {
    name: 'Ibu Rahma',
    lastChat: 'Sudah siap untuk rapat besok?',
  },
  {
    name: 'Mas Budi',
    lastChat: 'Terima kasih banyak atas rekomendasinya',
  },
  {
    name: 'Mbak Rina',
    lastChat: 'Segera kirimkan proposal tersebut',
  },
  {
    name: 'Pak Agus',
    lastChat: 'Tolong bawa dokumen-dokumen penting itu',
  },
  {
    name: 'Bu Indah',
    lastChat: 'Bagaimana kabar keluarga?',
  },
  {
    name: 'Mas Eko',
    lastChat: 'Jangan lupa beli bahan-bahan untuk masakan',
  },
  {
    name: 'Ibu Ani',
    lastChat: 'Terima kasih banyak atas bantuannya!',
  },
  {
    name: 'Pak Slamet',
    lastChat: 'Besok ada pertemuan penting, persiapkan diri ya',
  },
  {
    name: 'Bu Yanti',
    lastChat: 'Selamat ulang tahun! Semoga panjang umur dan sehat selalu',
  },
  {
    name: 'Mas Surya',
    lastChat: 'Jangan lupa kumpulkan laporan mingguan',
  },
  {
    name: 'Ibu Widya',
    lastChat: 'Tolong antar anak-anak ke sekolah pagi ini',
  },
  {
    name: 'Pak Ari',
    lastChat: 'Ada update terbaru mengenai proyek tersebut',
  },
  {
    name: 'Bu Dian',
    lastChat: 'Maafkan aku jika ada kesalahan kemarin',
  },
  {
    name: 'Mas Adi',
    lastChat: 'Sudah cek email belum? Ada info penting dari atasan',
  },
  {
    name: 'Ibu Maya',
    lastChat: 'Besar harapan kita proyek ini sukses',
  },
  {
    name: 'Pak Hadi',
    lastChat: 'Terimakasih atas kerjasamanya selama ini',
  },
  {
    name: 'Bu Nita',
    lastChat: 'Anak-anak sudah pulang sekolah belum?',
  },
];
