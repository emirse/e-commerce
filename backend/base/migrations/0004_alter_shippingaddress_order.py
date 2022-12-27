# Generated by Django 4.1.2 on 2022-10-20 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_rename_address_orderitem_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shippingaddress",
            name="order",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="base.orderitem",
            ),
        ),
    ]
