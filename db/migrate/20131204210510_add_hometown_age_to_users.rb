class AddHometownAgeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hometown, :string
    add_column :users, :age, :string
  end
end
