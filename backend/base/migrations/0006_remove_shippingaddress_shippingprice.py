# Generated by Django 4.1.2 on 2022-10-24 22:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_alter_shippingaddress_order"),
    ]

    operations = [
        migrations.RemoveField(model_name="shippingaddress", name="shippingPrice",),
    ]
